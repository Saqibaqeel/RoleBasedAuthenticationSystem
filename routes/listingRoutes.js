const express = require('express');
const router = express.Router();
const { authenticate, validateListing } = require('../middleware/auth');
const Listing = require('../models/Listing');
const expressError = require('../utility/expressError');

router.get('/', async (req, res, next) => {
    try {
        const listings = await Listing.find().populate('author', 'username');
        res.render('listings', { listings, user: req.user });
    } catch (err) {
        next(new expressError(500, 'Failed to load listings'));
    }
});

router.get('/new', (req, res) => {
    res.render('add-listing');
});

router.post('/', authenticate, async (req, res, next) => {
    try {
        if (!req.user) {
            throw new expressError(401, 'Unauthorized access');
        }

        const { title, description, price } = req.body;
        const listing = new Listing({
            title,
            description,
            price,
            author: req.user._id
        });

        await listing.save();
        req.flash('success', 'Listing has been created');
        res.redirect('/listings');
    } catch (err) {
        if (err instanceof expressError) {
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        next(new expressError(500, 'Failed to create listing'));
    }
});

router.get('/:id/edit', authenticate, async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing || (req.user.role !== 'Admin' && listing.author.toString() !== req.user.id)) {
            throw new expressError(403, 'Forbidden');
        }
        res.render('edit-listing', { listing });
    } catch (err) {
        next(err);
    }
});

router.put('/:id', authenticate,  async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing || (req.user.role !== 'Admin' && listing.author.toString() !== req.user.id)) {
            throw new expressError(403, 'Forbidden');
        }

        await Listing.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/listings');
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', authenticate, async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing || (req.user.role !== 'Admin' && listing.author.toString() !== req.user.id)) {
            throw new expressError(403, 'Forbidden');
        }

        await Listing.findByIdAndDelete(req.params.id);
        res.redirect('/listings');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
